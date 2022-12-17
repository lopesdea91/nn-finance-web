import { FormSignUp } from "@/components/form/FormSignUp";

export default () => {
  function submitSuccess() { }

  return (
    <FormSignUp submitSuccess={submitSuccess} />
  )
}