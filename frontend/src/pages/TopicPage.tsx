/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "../stores/auth";
import { useParams } from "react-router-dom";
import { useFetchData } from "../stores/fetchData";
import { useState } from "react";
import FlashCard from "../components/FlashCard/FlashCard";
import ElectricBorder from "../components/ElectricBorder/ElectricBorder";
import EmptyData from "../components/EmptyData/EmptyData";
import Stepper, { Step } from "../components/Stepper/Stepper";
import { useForm } from "react-hook-form";
import URL_API from "../stores/api";
import { toast } from "react-toastify";

type Topic = {
  name: string;
  description: string;
  visibility: string;
  user_id: [
    {
      id: string;
      username: string;
    }
  ];
  isActive: number;
};

type FlashCardForm = {
  front: string;
  back: string;
};
function TopicDetail() {
  const { user } = useAuthStore();
  const { id } = useParams(); //userParams là hàm dùng để lấy giá trị được cài trong route
  const { result: topic } = useFetchData<any>(`/topic/detail?topic_id=${id}`);
  const { result: flashcard, fetchData: fetchFlashcard } = useFetchData<any>(
    "/flashcard/show",
    { params: { topic_id: id } }
  );
  const [openForm, setOpenForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const flashcardForm = useForm({
    mode: "onChange",
  });
  const handleFinalSubmit = async (data: FlashCardForm) => {
    
    let finalData: any = {
      ...data,
      user_id: user?.id,
      topic_id: id,
    };
    if (topic?.user_id._id != user?.id) {
      finalData = {
        ...finalData,
        status: "pending",
      };
    }

    const res=await URL_API.post("/flashcard/create",finalData)
    if(res.status==201){
      toast.success(res.data.message);
    }
    fetchFlashcard();
    flashcardForm.reset();
    setOpenForm(false);
    setCurrentStep(1);
  };

  return (
    <>
      <div className="p-6  space-y-6">
        {/* Header */}
        <ElectricBorder color="#60efff">
          <div className="rounded-2xl border p-6 shadow-md flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">{topic?.name}</h1>
              <p className="text-gray-600">{topic?.description}</p>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <i className="fa-regular fa-clone" />
                  {flashcard?.count} cards
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">
                  by {topic?.user_id.username}
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="border-green-500 text-green-600 inline-flex items-center gap-2 rounded-xl bg-[#0061FF] outline-pink-500 px-4 py-2 text-white shadow-sm hover:bg-[#31AAFF]  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] transition m-[10px] cursor-pointer"
                onClick={() => {
                  setOpenForm(!openForm);
                  setCurrentStep(1);
                }}
              >
                <i className="fa-solid fa-plus" />
                Add Flashcard
              </button>
              <button className="border-green-500 text-green-600 inline-flex items-center gap-2 rounded-xl bg-[#595CFF] outline-pink-500 px-4 py-2 text-white shadow-sm hover:bg-[#96B3FF] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] transition m-[10px] cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <mask id="SVGiclGCbnp">
                      <g fill="none" stroke-linejoin="round" stroke-width="4">
                        <path
                          fill="#fff"
                          stroke="#fff"
                          d="M32 18H16C9.373 18 4 23.373 4 30s5.373 12 12 12h16c6.627 0 12-5.373 12-12s-5.373-12-12-12Z"
                        />
                        <path
                          stroke="#000"
                          stroke-linecap="round"
                          d="M16 26v8m-4-4h8"
                        />
                        <path
                          stroke="#fff"
                          stroke-linecap="round"
                          d="M24 16V9.714h8V4"
                        />
                        <path
                          fill="#000"
                          stroke="#000"
                          d="M32 34a4 4 0 1 0 0-8a4 4 0 0 0 0 8Z"
                        />
                      </g>
                    </mask>
                  </defs>
                  <path
                    fill="#fff"
                    d="M0 0h48v48H0z"
                    mask="url(#SVGiclGCbnp)"
                  />
                </svg>
                Start Quiz
              </button>
            </div>
          </div>
        </ElectricBorder>
        {/* Flashcards list */}
        {flashcard?.count > 0 ? (
          <div className="p-[20px] grid grid-cols-5 gap-8 justify-items-stretch">
            {flashcard?.data.map((fc:any) => (
              <FlashCard front={fc.front} back={fc.back}></FlashCard>
            ))}
          </div>
        ) : (
          <EmptyData
            title="This Topic Haven't Flashcard"
            titleBtn="Add Flashcard"
            onBtn={() => {
              setOpenForm(!openForm);
              setCurrentStep(1);
            }}
          ></EmptyData>
        )}
      </div>

      {/* Model add flashcard */}
      <div
        className={`fixed inset-0 flex items-center justify-center size-auto  ${
          openForm ? "" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => {
            flashcardForm.reset();
            setOpenForm(false);
            setCurrentStep(1);
          }}
        ></div>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stepper
            initialStep={1}
            className="relative z-10 rounded-4xl shadow-xl bg-white"
            onInit={(steps) => setTotalSteps(steps)}
            onFinalStepCompleted={() =>
              flashcardForm.handleSubmit(handleFinalSubmit)()
            }
            nextButtonProps={{
              type: "button",
              disabled:
                currentStep === totalSteps && !flashcardForm.formState.isValid,
            }}
            key={openForm ? "form-open" : "form-closed"}
            onStepChange={(step) => {
              setCurrentStep(step);
            }}
            backButtonText="Previous"
            nextButtonText={currentStep === totalSteps ? "Finish" : "Next"}
          >
            <Step>
              <h2>New flashcard</h2>
              <p>Check out the next step!</p>
            </Step>
            <Step>
              <h2>Step 2</h2>
              <p>Put the front: </p>
              <input
                className="bg-[#eeeeee] focus:border-indigo-600 focus:outline-hidden border-none rounded-[8px] text-[15px] p-[10px]"
                placeholder="What is the question..."
                {...flashcardForm.register("front", { required: true })}
              />
            </Step>
            <Step>
              <p>Put the back:</p>
              <input
                className="bg-[#eeeeee] focus:border-indigo-600 focus:outline-hidden border-none rounded-[8px] text-[15px] p-[10px] w-auto"
                placeholder="What is the answer..."
                required
                {...flashcardForm.register("back", { required: true })}
              />
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

export default TopicDetail;
