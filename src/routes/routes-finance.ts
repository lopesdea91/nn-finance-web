import { RouteRecordRaw } from "vue-router"

import FinanceView from '@/resource/views/finance/FinanceView.vue'
import FinanceItemView from '@/resource/views/finance/FinanceItemView.vue'
import FinanceExtractView from '@/resource/views/finance/FinanceExtractView.vue'
import FinanceListView from '@/resource/views/finance/FinanceListView.vue'
import FinanceListIdView from '@/resource/views/finance/FinanceListIdView.vue'
import FinanceInvoiceView from '@/resource/views/finance/FinanceInvoiceView.vue'
import FinanceInvoiceIdView from '@/resource/views/finance/FinanceInvoiceIdView.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/finance',
        // name: 'finance',
        component: FinanceView,
        children: [
            {
                path: 'item/:id?',
                name: 'finance-item',
                component: FinanceItemView
            },
            {
                path: 'extract',
                name: 'finance-extract',
                component: FinanceExtractView
            },
            {
                path: 'list',
                name: 'finance-list',
                component: FinanceListView
            },
            {
                path: 'list/:id',
                name: 'finance-list-id',
                component: FinanceListIdView
            },
            {
                path: 'invoice',
                name: 'finance-invoice',
                component: FinanceInvoiceView
            },
            {
                path: 'invoice/:id',
                name: 'finance-invoice-id',
                component: FinanceInvoiceIdView
            }
        ]
    },
]

export default routes