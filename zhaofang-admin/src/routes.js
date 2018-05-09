import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import OilInit from './views/nav1/oil_init.vue'
import OilgunEdit from './views/nav1/oilgun_edit'
import OilPrice from './views/nav1/oil_price.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import consumerDetail from './views/nav2/consumerDetail.vue'
import consumerAll from './views/nav2/consumerAll.vue'
import rechageDetail from './views/nav2/recharge_detail'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '油站管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/oil_init', component: OilInit, name: '油站初始化',id: '1-1' },
            { path: '/oilgun_edit', component: OilgunEdit, name: '油枪油品设置',id: '1-2' },
            { path: '/oil_price', component: OilPrice, name: '油品价格设置',id: '1-3' },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/consumer_detail', component: consumerDetail, name: '消费明细' },
            { path: '/consumer_all', component: consumerAll, name: '消费汇总' },
            { path: '/recharge_detail', component: rechageDetail, name: '充值明细' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;