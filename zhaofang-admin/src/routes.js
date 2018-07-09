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
import rechargeAll from './views/nav2/recharge_all'
import runAccount from './views/nav2/runAccount.vue'
import specialMess from './views/nav3/specialMess.vue'
import discountUE from './views/nav3/discountUE.vue'
import invoiceManage from './views/nav4/invoiceManage'
import invoiceBack from './views/nav4/invoiceBack'
import userManage from './views/nav5/userManage.vue'
import userConsumerDetail from './views/nav5/userConsumerDetail.vue'
import userBaseMeaasge from './views/nav5/userBaseMessage'
import roleManage from './views/nav6/roleManage'
import operatorManage from './views/nav6/operatorManage'
import echarts from './views/charts/echarts.vue'
import welcome from './views/welcome/welcome'
import global from './views/nav7/global'


let routes = [
    {
        path: '/',
        name: '',
        redirect: '/welcome',
        hidden: true
    }, 
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        hidden: true,
        name: '欢迎页面',
        iconCls: 'iconfont icon-coupons',
        // leaf: true,//只有一个节点
        children: [
            { path: '/welcome', component: welcome, name: '欢迎页面', id: 0},
        ]
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '油站管理',
        id: 1,
        iconCls: 'iconfont icon-manage',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true, id: 13 },
            { path: '/oil_init', component: OilInit, name: '油站初始化', id: 10},
            { path: '/oilgun_edit', component: OilgunEdit, name: '油枪油品设置', id: 11 },
            { path: '/oil_price', component: OilPrice, name: '油品价格设置', id: 12 },
            // { path: '/table', component: Table, name: 'Table' },
            // { path: '/form', component: Form, name: 'Form',  },
            // { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        iconCls: 'iconfont icon-createtask',
        children: [
            { path: '/consumer_detail', component: consumerDetail, name: '消费明细', id: 20 },
            { path: '/consumer_all', component: consumerAll, name: '消费汇总', id: 21 },
            { path: '/recharge_detail', component: rechageDetail, name: '充值明细', id: 22 },
            { path: '/recharge_all', component: rechargeAll, name: '充值汇总', id: 23 },
            { path: '/run_account', component: runAccount, name: '往来账', id: 24 }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '优惠信息',
        iconCls: 'iconfont icon-coupons',
        // leaf: true,//只有一个节点
        children: [
            { path: '/special_mess', component: specialMess, name: '优惠信息', id: 30},
            { path: '/discountUE', component: discountUE, name: '优惠规则文案表', id: 31 }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '发票管理',
        iconCls: 'iconfont icon-document',
        // leaf: true,//只有一个节点invoiceBack
        children: [
            { path: '/invoice_manage', component: invoiceManage, name: '发票管理', id: 40 },
            { path: '/invoice_back', component: invoiceBack, name: '已开票撤销', id: 41 }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'iconfont icon-addressbook',
        children: [
            { path: '/user_manage', component: userManage, name: '用户管理', id: 50 },
            { path: '/user_consumer_detail', component: userConsumerDetail, name: '用户消费明细', id: 51},
            { path: '/user_base_message', component: userBaseMeaasge, name: '用户基本信息', id: 52},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '权限管理',
        iconCls: 'iconfont icon-lock',
        children: [
            { path: '/role_manage', component: roleManage, name: '角色管理', id: 60 },
            { path: '/operator_manage', component: operatorManage, name: '操作员管理', id: 61},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '全局配置',
        iconCls: 'iconfont icon-setup',
        children: [
            { path: '/global', component: global, name: '全局配置', id: 70 },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;