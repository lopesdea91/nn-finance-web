import { AuthSignInForm } from "@/components/form/AuthSignInForm";

const Page = () => {
  function submitSuccess() { }

  return (
    <AuthSignInForm submitSuccess={submitSuccess} />
  )
}

export default Page