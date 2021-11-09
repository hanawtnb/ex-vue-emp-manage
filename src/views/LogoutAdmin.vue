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
  async created(): Promise<void> {
    console.log("created");
    await axios.get("http://153.127.48.168:8080/ex-emp-api/logout");
    this["$router"].push("/loginAdmin");
  }
}
</script>

<style></style>
