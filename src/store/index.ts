import Vue from "vue";
import Vuex from "vuex";
import { Employee } from "@/types/employee";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    // 従業員数
    totalEmployeeCount: 0,

    employees: new Array<Employee>(),
  },
  // end state

  actions: {
    /**
     * 従業員一覧情報をWebAPIから取得する.
     *
     * @remarks
     * 従業員一覧情報をWebAPIから取得してmutationを呼び出す。
     * @param context - コンテキストオブジェクト
     */
    async getEmployeeList(context) {
      const response = await axios.get(
        "http://153.127.48.168:8080/ex-emp-api/employee/employees"
      );
      console.dir("response:" + JSON.stringify(response));
      const payload = response.data;
      context.commit("showEmployeeList", payload);
    },
  },
  // end actions

  mutations: {
    /**
     * 従業員一覧情報を作成してstateに格納する.
     * @param state - ステートオブジェクト
     * @param payload - JSON形式の従業員数と従業員一覧情報
     */
    showEmployeeList(state, payload) {
      state.totalEmployeeCount = payload.totalEmployeeCount;
      state.employees = payload.employees;
      // for (const employee of payload.employees) {
      //   state.employees.push(
      // new Employee(
      //   employee.id,
      //   employee.name,
      //   employee.image,
      //   employee.gender,
      //   employee.fireDate,
      //   employee.mailAddress,
      //   employee.zipCode,
      //   employee.address,
      //   employee.telephone,
      //   employee.salary,
      //   employee.charasteristics,
      //   employee.dependentsCount,
      // )
      // );
      // }
    },
  },
  // end mutations

  getters: {
    /**
     * 従業員数を返す.
     * @param state - ステートオブジェクト
     */
    getEmployeeCount(state) {
      return state.totalEmployeeCount;
    },
    /**
     * 従業員一覧を返す.
     * @param state - ステートオブジェクト
     */
    getEmployees(state) {
      return state.employees;
    },

    // getEmployees1to10(state) {
    //   const employee1to10 = [];
    //   for (const employee of state.employees) {
    //     if (employee.id <= 10) {
    //       employee1to10.push(employee);
    //     }
    //     return employee1to10;
    //   }
    // },
    /**
     * IDから従業員を検索して返す.
     * @param state - ステートオブジェクト
     */
    getEmployeeById(state) {
      return (id: number) => {
        const hitEmployeeID = [];
        for (const employee of state.employees) {
          if (employee.id == id) {
            hitEmployeeID.push(employee);
          }
        }
        return hitEmployeeID[0];
      };
    },
  }, // end getters
  modules: {}, // end modules
});
