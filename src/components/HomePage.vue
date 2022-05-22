<template>
  <div class="page">
    <div class="container-fluid m-lg-5 p-5">
      <div class="row">
        <div class="col-12 col-lg-3">
          <router-link to="/admin-login" class="text-center py-3">
            <div>
              <img src="../assets/admin.png" alt="admin" class="icon" />
            </div>
            <div>
              <h3 class="text-dark">شئون طلبه</h3>
            </div>
          </router-link>
        </div>
        <div class="col-12 col-lg-3">
          <router-link to="/student-login" class="text-center py-3">
            <div>
              <img src="../assets/students.png" alt="admin" class="icon" />
            </div>
            <div>
              <h3 class="text-dark">طلبه</h3>
            </div>
          </router-link>
        </div>
        <div class="col-12 col-lg-3 dir">
          <router-link to="/accounter-login" class="text-center py-3">
            <div>
              <img src="../assets/budget.png" alt="admin" class="icon" />
            </div>
            <div>
              <h3 class="text-dark">محاسب</h3>
            </div>
          </router-link>
        </div>
        <div class="col-12 col-lg-3 dir">
          <router-link to="teacher-login" class="text-center py-3">
            <div>
              <img src="../assets/teacher.png" alt="admin" class="icon" />
            </div>
            <div>
              <h3 class="text-dark">أستاذ</h3>
            </div>
          </router-link>
        </div>
        <div class="col-12 image text-center">
          <img src="../assets/School-System-logos_black.png" alt="School" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page {
  width: 100%;
  min-height: 100%;
  display: flex;
}
.container-fluid {
  background-color: rgba(100, 100, 100, 0.3);
}
.icon {
  width: 100px;
  height: 100px;
}
.text-center {
  text-decoration: none;
}
.image img {
  width: 750px;
  max-width: 100%;
}

a {
  background: #eee;
  padding: 50px;
  border-radius: 50%;
  width: 220px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
  justify-content: center;
  transition: 1s all;
}
a:hover {
  background: rgb(168, 167, 167);
  box-shadow: 5px 15px 15px 5px #000;
  transition: 1s all;
}
.dir {
  direction: ltr;
}
</style>
