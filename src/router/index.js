import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Tenant/index/index'
import Login from '@/components/common/login/login'
import O_reg from '@/components/common/o_reg/o_reg'
import T_reg from '@/components/common/T_reg/T_reg'
import danye from '@/components/common/danye/danye'
import House_list from '@/components/Owner/House_list/House_list'
import Cart from '@/components/Owner/cart/cart'
import submit_order from '@/components/Owner/submit_order/submit_order'
import Address from '@/components/Owner/address/address'
import Add_address from '@/components/Owner/add_address/add_address'
import Shop from '@/components/Owner/shop/shop'
import Pro_detail from '@/components/Owner/product_detail/product_detail'
import Shop_cat from '@/components/Owner/shop_cat/shop_cat'
import O_user from '@/components/Owner/user/user'
import MyOrder from '@/components/Owner/my_order/my_order'
import order_detail from '@/components/Owner/order_detail/order_detail'
import user_info from '@/components/Owner/user_info/user_info'
import O_message from '@/components/Owner/O_message/O_message'
import House_detail from '@/components/Owner/house_detail/house_detail'
import Bespeak from '@/components/Owner/bespeak/bespeak'
import Mybespeak from '@/components/Owner/my_bespeak/my_bespeak'
import MybespeakDetail from '@/components/Owner/my_bespeak_detail/my_bespeak_detail'
import Online_renting from '@/components/Owner/Online_renting/Online_renting'
import Renting from '@/components/Owner/Renting/Renting'
import Renting_detail from '@/components/Owner/Renting_detail/Renting_detail'


import my_bill from '@/components/Owner/my_bill/my_bill'
import my_bill_detail from '@/components/Owner/my_bill_detail/my_bill_detail'


import zuwu from '@/components/Tenant/zuwu/zuwu'
import zuwu_detail from '@/components/Tenant/zuwu_detail/zuwu_detail'
import tuifang from '@/components/Tenant/tuifang/tuifang'
import tuifang_detail from '@/components/Tenant/tuifang_detail/tuifang_detail'

import yezhu_status from '@/components/common/yezhu_status/yezhu_status'




import T_bill from '@/components/Tenant/T_bill/T_bill'



import MyRepair from '@/components/Owner/my_Repair/my_Repair'
import apply_Repair from '@/components/Owner/apply_Repair/apply_Repair'
import Repair_detail from '@/components/Owner/Repair_detail/Repair_detail'

import applyCheckOut from '@/components/Owner/apply_check-out/apply_check-out'
import applyCheckOut1 from '@/components/Owner/apply_check_out1/apply_check_out1'
import suggest from '@/components/Owner/suggest/suggest'
import submit_suggest from '@/components/Owner/submit_suggest/submit_suggest'
import suggest_detail from '@/components/Owner/suggest_detail/suggest_detail'
import house_release from '@/components/Tenant/house_release/house_release'
import T_user from '@/components/Tenant/T_user/T_user'
import My_house from '@/components/Tenant/my_house/my_house'
import my_house_detail from '@/components/Tenant/my_house_detail/my_house_detail'
import Application from '@/components/Tenant/Application/Application'
import Application_detail from '@/components/Tenant/Application_detail/Application_detail'
import check_list from '@/components/Tenant/check_list/check_list'
import check_detail from '@/components/Tenant/check_detail/check_detail'
import bespeak_house from '@/components/Tenant/bespeak_house/bespeak_house'
import bespeak_house_detail from '@/components/Tenant/bespeak_house_detail/bespeak_house_detail'

// bespeak_house_detail
// bespeak_house
// Application
// my_Repair
// apply_Repair
// my_house_detail
// Repair_detail
// Application_detail
// suggest
// house_release
// apply_check-out
// apply_check_out1
// check_list

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/danye',
      name: 'danye',
      component: danye
    },
     {
      path: '/yezhu_status',
      name: 'yezhu_status',
      component: yezhu_status
    },
     {
      path: '/T_user',
      name: 'T_user',
      component: T_user
    },
     {
      path: '/bespeak_house',
      name: 'bespeak_house',
      component: bespeak_house
    },
     {
      path: '/bespeak_house_detail',
      name: 'bespeak_house_detail',
      component: bespeak_house_detail
    },
     {
      path: '/my_house',
      name: 'my_house',
      component: My_house
    },
    {
      path: '/zuwu',
      name: 'zuwu',
      component: zuwu
    },
    {
      path: '/zuwu_detail',
      name: 'zuwu_detail',
      component: zuwu_detail
    },
    {
      path:'/tuifang',
       name: 'tuifang',
      component: tuifang
    },
     {
      path:'/tuifang_detail',
       name: 'tuifang_detail',
      component: tuifang_detail
    },
    {
      path:'/my_house_detail',
      name:'my_house_detail',
      component:my_house_detail
    },
    {
        path: '/Application',
      name: 'Application',
      component: Application
    },
    {
      path: '/Application_detail',
      name: 'Application_detail',
      component: Application_detail
    },
    {
      path: '/MyRepair',
      name: 'MyRepair',
      component: MyRepair
    },
    {
      path: '/apply_Repair',
      name: 'apply_Repair',
      component: apply_Repair
    },
    {
      path: '/Repair_detail',
      name: 'Repair_detail',
      component: Repair_detail
    },
    {
        path: '/check_list',
      name: 'check_list',
      component: check_list
    },
     {
        path: '/check_detail',
      name: 'check_detail',
      component: check_detail
    },
     {
      path: '/o_reg',
      name: 'O_reg',
      component: O_reg
    },
    {
      path: '/my_bill',
      name: 'my_bill',
      component: my_bill
    },
     {
      path: '/T_bill',
      name: 'T_bill',
      component: T_bill
    },
     {
      path: '/my_bill_detail',
      name: 'my_bill_detail',
      component: my_bill_detail
    },
    {
      path:'/suggest',
      name:'suggest',
      component: suggest
    },
     {
      path:'/suggest_detail',
      name:'suggest_detail',
      component: suggest_detail
    },
    {
      path:'/submit_suggest',
      name:'submit_suggest',
      component: submit_suggest
    },
    {
      path: '/t_reg',
      name: 'T_reg',
      component: T_reg
    },
    {
      path:'/house_release',
      name: 'house_release',
      component: house_release
    },
    {
      path: '/house_list',
      name: 'House_list',
      component: House_list
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
       path: '/user_info',
      name: 'user_info',
      component: user_info
    },
    {
      path: '/add_address',
      name: 'Add_address',
      component: Add_address
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/submit_order',
      name: 'submit_order',
      component: submit_order
    },
    {
      path: '/my_order',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/order_detail',
      name: 'order_detail',
      component: order_detail
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path:'/product_detail',
      name:'Pro_detail',
      component:Pro_detail
    },
    {
      path: '/shop_cat',
      name: 'shop_cat',
      component: Shop_cat
    },
    {
      path: '/O_user',
      name: 'O_user',
      component: O_user
    },
    {
      path: '/O_message',
      name: 'O_message',
      component: O_message
    },
    {
      path: '/apply_check-out',
      name: 'applyCheckOut',
      component: applyCheckOut
    },
    {
      path: '/apply_check_out1',
      name: 'applyCheckOut1',
      component: applyCheckOut1
    },
     {
      path: '/house_detail',
      name: 'House_detail',
      component: House_detail
    },
    {
      path: '/bespeak',
      name: 'Bespeak',
      component: Bespeak
    },
    {
      path: '/Renting',
      name: 'Renting',
      component: Renting
    },
     {
      path: '/Renting_detail',
      name: 'Renting_detail',
      component: Renting_detail
    },
    {
      path: '/my_bespeak',
      name: 'Mybespeak',
      component: Mybespeak
    },
    {
      path: '/my_bespeak_detail',
      name: 'MybespeakDetail',
      component: MybespeakDetail
    },
    {
      path: '/Online_renting',
      name: 'Online_renting',
      component: Online_renting
    }
  ],
  scrollBehavior (to, from, savedPosition) {
  

      return { x: 0, y: 0 }
  }
})
