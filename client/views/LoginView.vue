<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
import { computed, ref } from "vue";
let isLogin = ref(true);
let isSignup = ref(false);

function clickLogin() {
  isLogin.value = true;
  isSignup.value = false;
}

function clickSignup() {
  isLogin.value = false;
  isSignup.value = true;
}

const sliderStyle = computed(() => {
  return {
    left: isLogin.value ? "0px" : "150px",
  };
});
</script>

<template>
  <div class="container">
    <div class="btn">
      <button class="login" :class="{ active: isLogin }" @click="clickLogin">Login</button>
      <button class="signup" :class="{ active: isSignup }" @click="clickSignup">Signup</button>
    </div>
    <div class="form-section">
      <div class="login-box" v-if="isLogin">
        <LoginForm />
      </div>
      <div class="signup-box" v-else>
        <RegisterForm />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  font-family: "Poppins", sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background-color: #07172b; /* Navy blue background color */
  margin: 0;
}

.container {
  margin-top: 80px;
  background-color: #1a3b4c; /* Slightly lighter blue background */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh; /* Set the height to 100vh to cover the entire viewport height */
  /* margin: 0;  */
}

.btn {
  height: 60px;
  width: 300px;
  margin: 20px auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.active {
  height: 60px;
  width: 150px;
  margin: 20px auto;
  border-radius: 50px;
  background: linear-gradient(to right, #072d51, #034d61); /* Dark blue gradient */
  font-size: 20px;
  border: none;
  cursor: pointer;
}

.login,
.signup {
  font-size: 20px;
  padding: 10px 20px;
  width: 150px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background 0.3s ease;
  border-radius: 50px;
}

.login-box,
.signup-box {
  height: 100%;
  background-color: #004360; /* Darker blue background */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 50%;
}

.slider {
  height: 60px;
  width: 150px;
  border-radius: 50px;
  background: linear-gradient(to right, #072d51, #034d61);
  transition: all 0.5s ease-in-out;
}
.moveslider {
  left: 250px;
}

.form-section {
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: center;
  transition: all 0.5s ease-in-out;
  background-color: #07172b; /* Navy blue background */
  width: 1000px;
}
</style>
