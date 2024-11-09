import { SignIn } from "@clerk/clerk-react";


const Signin = () => {
   return <SignIn signUpUrl="/sign-up" forceRedirectUrl="/chat" />;
};

export default Signin;
