<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class LogoutAdmin extends Vue {
  /**
   * ログアウトをする.
   *
   * @ログイン情報を削除する。
   */
  //   mounted(): void {
  //     console.log("create");

  //     this.logoutAdmin();
  //   }

  async created(): Promise<void> {
    console.log("logoutAdmin");
    const response = await axios.get(
      "http://54.200.203.52:8080/ex-emp-api/logout"
    );
    console.dir("response:" + JSON.stringify(response));
    this["$router"].push("/loginAdmin");
  }
}
</script>

<style></style>
