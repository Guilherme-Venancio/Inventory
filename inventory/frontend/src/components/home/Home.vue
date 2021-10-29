<template>
 <div class="home">
     <PageTitle icon="fa fa-home" main="Dashboard" />
      <div class="initial">
          <span><h3>Bem vindo {{ user.name }}</h3></span>
          <h5>Ultimas movimentações</h5>
      </div>     
        <b-table head-row-variant="dark" :items="users" :fields="fields"  >
        </b-table>
        <div class="chart">
        <AreaChart 
        :options="options" />
        </div>
        
 </div>
</template>

<script>
import AreaChart from '../chart/AreaChart.vue'

import PageTitle from '../Templates/PageTitle.vue'
import moment from 'moment'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'NovoAdmin',
    components: { PageTitle, AreaChart },
    computed: mapState(['user']),
    data: function() {
        return {
            userr: {},
            users: [],
            itens: [],
            fields: [
                { key: 'name', label: 'Nome', },
                { key: 'deletedAt', label: 'Última Alteração',
                  formatter: 'Moment' },
            ],
            fields1: [
                {  label: 'Nome' },
            ],
            chartData: {
        Books: 24,
        Magazine: 30,
        Newspapers: 10
      }
        }
    },
    methods: {
        Moment(data) {
           return moment(data).format('DD/MM/YYYY - hh:mm:ss a')
        },
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
            })
        },
        loadItens() {
      const url = `${baseApiUrl}/itens`
      axios.get(url).then((res) => {
        this.itens = res.data
        this.totalRows = this.itens.length
      })
    },
    },
    mounted() {
        this.loadUsers()
        this.loadItens()
    }
}
</script>

<style>
.initial {
    text-align: center;
    padding: 25px;
animation: 1s, linear;
        animation-name: slidein;
        opacity: 1;
}
    @keyframes slidein {
      from {
    
      opacity: 0;
      margin-left: 2500px;
    
  }

      to {
   
      opacity: 0.5;
       margin-left: 250px;
    }
  }
.initial h3 {
    padding-bottom: 15px;;
}
.chart {
    background: linear-gradient(to right, #171718, #646468);
    margin-left: 250px;
        width: 800px;
        height: 1fr;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        margin-right: 20px;
        margin-bottom: 20px;  
        animation: 2s, linear;
        animation-name: slidein;
        opacity: 1;
}
    @keyframes slidein {
      from {
    
      opacity: 0;
      margin-left: 2500px;
    
  }

      to {
   
      opacity: 0.5;
       margin-left: 250px;
    }
  }

</style>
