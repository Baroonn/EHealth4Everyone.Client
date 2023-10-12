<template>
  <div id="app">
    <!-- <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">EHealth4Everyone</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/patients" class="nav-link">Patients</router-link>
        </li>
      </div>
    </nav> -->

    <div class="container-fluid" padding="0px">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>