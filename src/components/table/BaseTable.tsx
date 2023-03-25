import { _limitApi } from '@/types/enum'
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, TableFooter, TablePagination, Paper } from '@mui/material'

type BaseTableTH = string[]

type BaseTableProps = {
	children: React.ReactNode
	headerEditId?: boolean
	headerTexts: BaseTableTH
	bodyItemsLength: number
	columnsCount: number
	search: {
		limit: number
		page: number
		total: number
	}
	changePage: (n: number) => void
	changePerPage: (n: _limitApi) => void
}

export {
	TableCell as TCell,
	TableRow as TRow,
}

export const BaseTable = (props: BaseTableProps) => {

	function handleChangePage(
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) {
		newPage++

		props.changePage(newPage)
	}

	function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const newLimit = +Number(event.target.value)

		props.changePerPage(newLimit as _limitApi)
	}

	return (
		<TableContainer component={Paper} sx={{ t: 2, mb: 1 }}>
			<Table size='small'>
				<TableHead>
					<TableRow>
						{props.headerEditId &&
							<TableCell component="th" sx={{ py: 1, px: 0 }}></TableCell>
						}
						{props.headerTexts.map(t => (
							<TableCell key={t} component="th" sx={{ py: 1, px: 0 }}>{t}</TableCell>
						))}
						{/* <TableCell component="th" sx={{ py: 1, px: 0 }}>Status</TableCell> */}
						{/* <TableCell component="th" sx={{ py: 1, px: 0 }}>Painel</TableCell> */}
					</TableRow>
				</TableHead>

				<TableBody>
					{props.bodyItemsLength > 0
						? props.children
						: (
							<TableRow style={{ height: 30 }}>
								<TableCell colSpan={props.columnsCount}>
									Lista vazia
								</TableCell>
							</TableRow>
						)
					}
				</TableBody>

				{(props?.search && !!props.search.total && !!props.search.page) &&
					<TableFooter>
						<TableRow>
							<TablePagination
								labelRowsPerPage=''
								rowsPerPageOptions={[15, 25, 50]}
								colSpan={props.columnsCount}
								count={props.search.total}
								rowsPerPage={props.search.limit}
								page={props.search.page - 1}
								SelectProps={{
									inputProps: { 'aria-label': '' },
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							// ActionsComponent={(
							//   <>
							//     <div>Oi</div>
							//   </>
							// )}
							/>
						</TableRow>
					</TableFooter>}
			</Table>
		</TableContainer>
	)
}