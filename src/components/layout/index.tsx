import { LayoutInternal } from "./internal/Index"
import { LayoutExternal } from "./external/Index"
import useSystemStore from "@/hooks/useSystemStore"

type Props = {
	children: React.ReactNode
}
export const Layout = ({ children }: Props) => {
	const { state } = useSystemStore()

	const Modo = state.login ? LayoutInternal : LayoutExternal

	return (
		<Modo>
			{children}
		</Modo>
	)
}