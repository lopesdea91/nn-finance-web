import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppAlert,
  AppButton,
  AppColumn,
  AppColumns,
  AppDivider,
  AppForm,
  AppInput,
  AppText
} from "@/components";

const formSchema = z.object({
  messageForm: z.string().optional(),
  email: z.string().nonempty("campo obrigatório").email("email inválido"),
  password: z
    .string()
    .nonempty("campo obrigatório")
    .min(6, "a senha deve ter no mínimo 6 digitos"),
});

export type FormData = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (fields: FormData) => void
  messageSubmit: string
};
export const SignInForm = (props: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    control,
  } = useForm<FormData>({
    defaultValues: {
      email: "test1@email.com", // test1@email.com
      password: "123456",  // 123456
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <AppForm
      onSubmit={handleSubmit(props.onSubmit)}
      sx={{ p: 3, maxWidth: 325 }}
      data-testid="form"
    >
      <AppText variant="h3">Bem Vindo</AppText>

      <AppDivider />

      {props.messageSubmit && (
        <AppAlert severity="error" sx={{ mb: 1 }}>
          {props.messageSubmit}
        </AppAlert>
      )}

      <AppColumns>
        <AppColumn xs={12}>
          <Controller
            control={control}
            name="email"
            render={(p) => (
              <AppInput
                labelProps={{
                  label: "E-mail",
                }}
                inputProps={{
                  error: errors.email?.message,
                  ...p.field,
                }}
              />
            )}
          />
        </AppColumn>

        <AppColumn xs={12}>
          <Controller
            control={control}
            name="password"
            render={(p) => (
              <AppInput
                labelProps={{
                  label: "Senha",
                }}
                inputProps={{
                  error: errors.password?.message,
                  ...p.field,
                  type: 'password'
                }}
              />
            )}
          />
        </AppColumn>

        <AppColumn xs={12}>
          <AppButton type="submit">Entrar</AppButton>
        </AppColumn>
      </AppColumns>
    </AppForm>
  );
};