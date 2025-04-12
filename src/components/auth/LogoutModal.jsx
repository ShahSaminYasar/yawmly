import { useSettings } from "@/services/SettingsProvider";
import { signOut } from "next-auth/react";
import { GoSignOut } from "react-icons/go";

const LogoutModal = () => {
  const { logoutModalVisible, setLogoutModalVisible, colors } = useSettings();

  const executeLogout = () => {
    localStorage.removeItem("user");
    setLogoutModalVisible(false);
    return signOut();
  };

  return (
    logoutModalVisible && (
      <div className="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xs flex items-center justify-center fade p-4">
        {/* Modal Closer Layer */}
        <div
          className="absolute z-[-1] top-0 left-0 w-full h-full bg-transparent"
          onClick={() => {
            setLogoutModalVisible(false);
          }}
        ></div>

        {/* Block/Session Add Modal */}
        <div
          className={`z-20 w-full max-w-[370px] h-fit max-h-[95%] overflow-y-auto rounded-lg bg-white p-5 shadow-lg fade-down`}
        >
          <span
            className="text-2xl font-normal block text-center mb-3"
            style={{
              color: colors?.primary,
            }}
          >
            LOGOUT
          </span>

          <p className="block text-center text-lg font-medium text-slate-600 mb-2">
            Are you sure you want to logout?
          </p>
          <p className="block text-center text-sm font-semibold text-red-500 max-w-[230px] mb-4 mx-auto">
            You will lose access to your plans until you log in next time.
          </p>

          <div className="flex flex-row gap-2 items-center">
            <button
              type="button"
              onClick={() => {
                setLogoutModalVisible(false);
              }}
              className="w-[50%] text-sm font-normal block text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer bg-white border-2"
              style={{
                color: colors?.primary,
                borderColor: colors?.primary,
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={executeLogout}
              className="w-full text-sm font-semibold flex flex-row gap-1 items-center justify-center text-center px-2 py-[8px] rounded-sm active:scale-[92%] mt-1 cursor-pointer text-white border-2"
              style={{
                backgroundColor: colors?.primary,
                borderColor: colors?.primary,
              }}
            >
              Logout <GoSignOut className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default LogoutModal;
