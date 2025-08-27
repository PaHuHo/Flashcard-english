import { create } from "zustand";
import { persist } from "zustand/middleware";
import {jwtDecode} from "jwt-decode";
//Zustand có Persist để hỗ trợ lưu token hoặc gì đó vào localStorage để khi reload token không null
//NếU khôg dùng Persist thì dùng cú pháp localStorage.setItem("token", res.data.token); để lưu token và dùng  const token = localStorage.getItem("token"); để gán lại khi reload lại trang

interface AuthState {
  token: string | null;
  user: { id: number; email: string; username: string; role: number } | null;
  login: (
    token: string,
    user: { id: number; email: string; username: string; role: number }
  ) => void;
  logout: () => void;
  me: () => void;
}
type JWTPayload = {
  exp: number; // expiry time (Unix timestamp)
};
let logoutTimer: NodeJS.Timeout | null = null;
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      login: (token, user) => {
        // Giải mã token
        try {
          const decoded: JWTPayload = jwtDecode(token);
          const expiresIn = decoded.exp * 1000 - Date.now();

          // Clear timer cũ (nếu có)
          if (logoutTimer) clearTimeout(logoutTimer);

          // Set timer auto logout
          if (expiresIn > 0) {
            logoutTimer = setTimeout(() => {
              set({ token: null, user: null });
            }, expiresIn);
          } else {
            set({ token: null, user: null }); // token hết hạn rồi thì logout ngay
          }

          set({ token, user });
        } catch (err) {
          console.error("Invalid token", err);
          set({ token: null, user: null });
        }
      },
      logout: () => {
        if (logoutTimer) clearTimeout(logoutTimer);
        set({ token: null, user: null });
      },
      me: () =>get().user
    }),
    {
      name: "auth-storage", // tên name là tên key trong localStorage có thể setting tên ở đây
    }
  )
);
