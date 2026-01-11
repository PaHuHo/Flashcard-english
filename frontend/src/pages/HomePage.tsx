/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "../stores/auth";
import Stepper, { Step } from "../components/Stepper/Stepper";
import { useState } from "react";
import { useFetchData } from "../stores/fetchData";
import URL_API from "../stores/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TopicCard from "../components/TopicCard/TopicCard";
import ElectricBorder from "../components/ElectricBorder/ElectricBorder";
import EmptyData from "../components/EmptyData/EmptyData";

type TopicForm = {
  name: string;
  description: string;
  visibility: string;
};

function HomePage() {
  const { user } = useAuthStore();
  const [openForm, setOpenForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(0);
  const topicDataForm = useForm<TopicForm>({
    mode: "onChange",
  });

  const {
    result: allTopics,
    loading: loadingAll,
    fetchData: fetchAllTopics,
  } = useFetchData<any>("/topic/show");

  const { result: userTopics, fetchData: fetchUserTopics } = useFetchData<any>(
    `/topic/show?user_id=${user?.id}`
  );

  const handleFinalSubmit = async (data: TopicForm) => {
    const finalData = {
      ...data,
      user_id: user?.id,
    };
    const res = await URL_API.post("/topic/create", finalData);
    if (res.status == 201) {
      toast.success(res.data.message);
    }
    // reset lại form & đóng Stepper
    topicDataForm.reset();
    setOpenForm(false);
    setCurrentStep(1);

    fetchUserTopics();
    fetchAllTopics();
  };
  return (
    <>
      <div className="mb-[40px] m-[10px]">
        <ElectricBorder
          color="#ffcc23ff"
          speed={0.3}
          chaos={1.5}
          thickness={3}
          style={{ borderRadius: 16, padding: 15 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[20px] font-semibold tracking-wide ml-[10px]">
              Your Topic
            </span>
            <button
              onClick={() => {
                setOpenForm(!openForm);
                setCurrentStep(1);
              }}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 outline-pink-500 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] transition m-[10px] cursor-pointer"
            >
              <i className="fa-solid fa-plus"></i> New topic
            </button>
          </div>
          {userTopics?.length > 0 ? (
            <div className="p-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-stretch">
              {userTopics?.map((topic: any) => (
                <TopicCard
                  id={topic._id}
                  name={topic.name}
                  description={topic.description}
                  totalCard={topic.flashcardCount}
                  username={topic.user_id.username || ""}
                ></TopicCard>
              ))}
            </div>
          ) : (
            <EmptyData title="Empty Topic" showButton={false}></EmptyData>
          )}
        </ElectricBorder>
      </div>

      <div className="m-[10px]">
        <ElectricBorder
          color="#09a5ffff"
          style={{ borderRadius: 16, padding: 15 }}
        >
          <div>
            <span className="text-[20px] font-semibold tracking-wide ml-[10px]">
              Topic
            </span>
            {allTopics?.length > 0 ? (
              <div className="p-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-stretch">
                {allTopics?.map((topic: any) => (
                  <TopicCard
                    id={topic._id}
                    name={topic.name}
                    description={topic.description}
                    totalCard={topic.flashcardCount}
                    username={topic.user_id.username || ""}
                  ></TopicCard>
                ))}
              </div>
            ) : (
              <EmptyData title="Empty Topic" showButton={false}></EmptyData>
            )}
          </div>
        </ElectricBorder>
      </div>

      {/* Loading */}
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          loadingAll ? "" : "hidden"
        }`}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1"
            d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              dur="0.588s"
              from="0,12,12"
              repeatCount="indefinite"
              to="360,12,12"
              type="rotate"
            />
          </path>
        </svg>
      </div>
      {/* Modal popup form */}
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          openForm ? "" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => {
            topicDataForm.reset();
            setOpenForm(false);
            setCurrentStep(1);
          }}
        ></div>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stepper
            className="relative z-10 rounded-4xl shadow-xl bg-white"
            onInit={(steps) => setTotalSteps(steps)}
            nextButtonProps={{
              type: "button",
              disabled:
                currentStep === totalSteps && !topicDataForm.formState.isValid,
            }}
            onFinalStepCompleted={() =>
              topicDataForm.handleSubmit(handleFinalSubmit)()
            }
            key={openForm ? "form-open" : "form-closed"}
            initialStep={1}
            onStepChange={(step) => {
              setCurrentStep(step);
            }}
            backButtonText="Previous"
            nextButtonText={currentStep === totalSteps ? "Finish" : "Next"}
          >
            <Step>
              <h2>New topic</h2>
              <p>Check out the next step!</p>
            </Step>
            <Step>
              <h2>Step 2</h2>
              <p>Put name your topic: </p>
              <input
                className="bg-[#eeeeee] focus:border-indigo-600 focus:outline-hidden border-none rounded-[8px] text-[15px] p-[10px]"
                placeholder="Topic name ..."
                {...topicDataForm.register("name", { required: true })}
              />
            </Step>
            <Step>
              <p>Description your topic</p>
              <input
                className="bg-[#eeeeee] focus:border-indigo-600 focus:outline-hidden border-none rounded-[8px] text-[15px] p-[10px] w-auto"
                placeholder="Description topic ..."
                required
                {...topicDataForm.register("description", { required: true })}
              />
            </Step>
            <Step>
              <h2>Choose visibility </h2>
              <label>Choose who can see and Contribution to your topic</label>
              <select
                className="bg-[#eeeeee] focus:border-indigo-600 focus:outline-hidden border-none rounded-[8px] text-[15px] p-[10px] w-auto"
                {...topicDataForm.register("visibility", { required: true })}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </Step>
            <Step>
              <h2>Review</h2>
              <p>Check your data before finishing!</p>
            </Step>
          </Stepper>
        </form>
      </div>
    </>
  );
}

export default HomePage;
