import { FormSignUp } from "@/components/form/FormSignUp";

const Page = () => {
  function submitSuccess() { }

  return (
    <FormSignUp submitSuccess={submitSuccess} />
  )
}

export default Page