import AuthForms from "./AuthForms";
import GoogleLogin from "./GoogleLogin";

const AuthPage = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-center w-full max-w-7xl mx-auto fade py-4">
      <AuthForms />

      {/* Divider */}
      <div className="flex items-center justify-center w-full max-w-[300px] sm:w-fit sm:flex-col sm:h-[200px] gap-2 text-xs text-[#bababa]">
        <span className="w-full rounded-sm h-[1px] bg-[#bababa] sm:w-[1px] sm:h-full"></span>
        <span>OR</span>
        <span className="w-full rounded-sm h-[1px] bg-[#bababa] sm:w-[1px] sm:h-full"></span>
      </div>

      <GoogleLogin
        style={{
          maxWidth: "320px",
        }}
      />
    </div>
  );
};
export default AuthPage;
