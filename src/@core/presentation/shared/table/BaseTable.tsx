import styled from '@emotion/styled'
import React from 'react'
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, TableFooter, TablePagination } from '@mui/material'
import { _limitApi } from '@/types/enum'
import { Pagination } from './Pagination'
import { useMediaQuerys } from '@/hooks'

type BaseTableProps = {
	contentHeader: React.ReactNode
	contentBody: React.ReactNode
	bodyItemsLength?: number
	columnsCount?: number
	search?: {
		limit: number
		page: number
		total: number
	}
	changePage?: (n: number) => void
	changePerPage?: (n: _limitApi) => void
	responsive?: boolean
}
const BaseTable = (props: BaseTableProps) => {
	function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) {
		newPage++

		!!props.changePage && props.changePage(newPage)
	}
	function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const newLimit = +Number(event.target.value)

		!!props.changePerPage && props.changePerPage(newLimit as _limitApi)
	}

	return (
		<TableContainerStyled sx={{ pt: 1 }} data-testid="table" className={props.responsive ? '--table-responsive' : ''}>
			<Table size='small'>
				<TableHead>
					<TRow>
						{props.contentHeader}
					</TRow>
				</TableHead>

				<TableBody>
					{!props?.bodyItemsLength && props.contentBody}

					{!!props?.bodyItemsLength && (props?.bodyItemsLength > 0
						? props.contentBody
						: (
							<TRow style={{ height: 30 }}>
								<TCell colSpan={props.columnsCount}>
									Lista vazia
								</TCell>
							</TRow>
						))}
				</TableBody>

				{(props.changePage && props.changePerPage) && (props?.search && !!props.search.total && !!props.search.page) &&
					<TableFooter>
						<TRow>
							<TablePagination
								labelRowsPerPage=''
								rowsPerPageOptions={[15, 30, 50]}
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
							/>
						</TRow>
					</TableFooter>}
			</Table>
		</TableContainerStyled>
	)
}
const TableContainerStyled = styled(TableContainer)`
	&.MuiTableContainer-root {
		box-shadow: inset 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
	}
	&.--table-responsive {
		@media(max-width: 426px) {
			.MuiTableCell-root {
				border-color: transparent
			}
		}
	}
`
const RowResponsive = ({
	previewMobile, previewDesktop
}: {
	previewMobile: React.ReactNode, previewDesktop: React.ReactNode
}) => {

	const { minTable } = useMediaQuerys()

	return (
		<TRow>
			{minTable ? previewDesktop : previewMobile}
		</TRow>
	)

}
const TRow = styled(TableRow)`
`
const TCell = styled(TableCell)`
	@media(max-width: 426px) {
		padding-top: 0;
	}
`
export {
	BaseTable,
	TCell,
	TRow,
}

export const Table2 = {
	Container: BaseTable,
	Row: TRow,
	Cell: TCell,
	RowResponsive,
	Pagination: Pagination
}