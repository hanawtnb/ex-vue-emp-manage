<template>
  <div>
    <div class="container">
      <div>従業員数:{{ EmployeeCount }}人</div>
      <div class="row">
        <table class="striped">
          <thead>
            <tr>
              <th>名前</th>
              <th>入社日</th>
              <th>扶養人数</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="employee of Employees" v-bind:key="employee.id">
              <td>
                <router-link v-bind:to="'/employeeDetail/' + employee.id">
                  <span>{{ employee.name }}</span>
                </router-link>
              </td>

              <td>{{ employee.hireDate }}</td>
              <td>{{ employee.dependentsCount }}人</td>
            </tr>
          </tbody>
        </table>
        <span v-for="page of pageNumber" v-bind:key="page.id" class="button">
          <button
            id="btn"
            class="waves-effect waves-light btn"
            type="button"
            v-on:click="onMovePages(page)"
          >
            {{ page }}</button
          >&nbsp;
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types/employee";

@Component
export default class EmployeeList extends Vue {
  //  最初の１ページを表示
  private pageNum = 1;
  /**
   * WebAPIから従業員一覧を取得する.
   *
   * @remarks
   * Vuex ストアのアクション経由で非同期で WebAPI から従業員一覧を取得する。
   */
  created(): void {
    this["$store"].dispatch("getEmployeeList");
  }

  /**
   * 従業員数を取得して返す.
   *
   * @remarks
   * 非同期で取得したVuexストア内の従業員数を取得して返す。
   */
  get EmployeeCount(): number {
    return this["$store"].getters.getEmployeeCount;
  }

  /**
   * 従業員一覧を取得して返す.
   * @remarks
   * 押されたページ数を代入。
   */
  onMovePages(page: number): void {
    this.pageNum = page;
  }

  /**
   * 従業員一覧を取得して返す.
   * @remarks
   * ページ数から必要な従業員を取得して返す。
   */
  get Employees(): Array<Employee> {
    const employees = this["$store"].getters.getEmployees;
    return employees.slice((this.pageNum - 1) * 10, this.pageNum * 10 - 1);
  }

  /**
   * ページ数を取得して返す.
   */
  get pageNumber(): number {
    return Math.ceil(this.EmployeeCount / 10);
    // const pages = new Array<number>();
    // let allEmployees = this.EmployeeCount;

    // if (allEmployees % 10 == 0) {
    //   allEmployees = Math.floor(allEmployees / 10);
    // } else {
    //   allEmployees = Math.floor(allEmployees / 10 + 1);
    // }
    // for (let i = 1; i <= allEmployees; i++) {
    //   pages.push(i);
    // }
    // return pages;
  }
}
</script>

<style></style>
