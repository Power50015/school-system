<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-xl-3">
        <router-link to="/add-doctor" class="dashbord-btn">أضف استاذ</router-link>
      </div>
      <div class="col-12 col-xl-3">
        <router-link to="/add-project" class="dashbord-btn">أضف محاسب</router-link>
      </div>
     <div class="col-12 col-xl-3">
        <router-link to="/add-student" class="dashbord-btn">أضف طالب</router-link>
      </div>
      
      <div class="col-12 col-xl-3">
        <router-link to="/add-admin" class="dashbord-btn">أضف شئون الطلبه</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.row{
    margin-top: 200px;
    text-align: center;
}
.col-12{
    margin: 55px 0;
}
.dashbord-btn{
    text-align: center;
    color: #ffebd8;
    background: #4548e3;
    padding: 50px;
    text-decoration: none;
    font-size: 25px;
    transition: all 0.5s;
}

.dashbord-btn:hover{
    box-shadow: 9px 10px 8px 0px #000;
    
    }
</style>