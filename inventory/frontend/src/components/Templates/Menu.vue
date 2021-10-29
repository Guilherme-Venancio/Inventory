<template>
  <aside class="menu" v-show="isMenuVisible">                                   
   <a href="/" > Home </a>
   <a href="/admin" > Administração </a>
   <a href="/" > Ajuda </a>
  </aside>
</template>

<script>
import { mapState } from "vuex";


export default {
  name: "Menu",
  computed: mapState(["isMenuVisible"]),
  
}
</script>

<style>
.menu {
  color: white;
  grid-area: menu;
  background: linear-gradient(to right, #646468, #343536);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.menu a {
   color: #fff;
   font-size: 0.8rem;
        text-decoration: none;
        padding-top: 30px;
        padding-bottom: 20px;
        padding-left: 10px;
}
.menu a:hover{
        color: rgb(112, 112, 112);
        
}

</style>