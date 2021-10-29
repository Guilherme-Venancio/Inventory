<template>
  <div class="user-admin">
    <div class="button">
      <b-button
        pill
        variant="dark"
        @click=" cadastro(); Mode(); loadUser()" v-show="adicionar === 'ver'">
    Incluir
      </b-button>
    </div>
    <div class="form">
      <b-form class="   col-md-6 offset-md-3" v-show="adicionar === 'cad'">
       <b-card v-show="adicionar === 'cad'"
        bg-variant="light" border-variant="dark" 
        :header="titulo"
        header-text-variant="white" 
        align="center" 
        style="max-width: 650px"
        header-bg-variant="dark">   
        <input id="iten-id" type="hidden" v-model="iten.id" />
          <b-row align-h="center" class="mt-3" >
          <b-col md="6" sm="12">
        <b-form-group label="Nome:" >
          <b-form-input
            id="iten-name"
            type="text"
            v-model="iten.name"
            required
            :readonly="mode !== 'save'"
            placeholder=""
          />
        </b-form-group>
          </b-col>
         </b-row>
          <b-row align-h="center" class="mt-3" >
          <b-col md="3" sm="3">
        <b-form-group label="Quantidade:">
          <b-form-input
            id="iten-quantidade"
            type="number"
            v-model="iten.quantidade"
            required
            :readonly="mode !== 'save'"
            placeholder=""
          />
        </b-form-group>
          </b-col>
          </b-row>
        <b-row align-h="center" class="mt-3" v-show="mode !== 'remove'">
            <b-col md="6" sm="12">
            <b-form-group label="Modelo:" label-for="iten-modelo" >
              <b-form-input
                id="iten-modelo"
                type="text"
                v-model="iten.modelo"
                :readonly="mode === 'details'"
                placeholder=""
              />
            </b-form-group>
            </b-col>
        </b-row>
         <b-row align-h="around" class="mt-3" v-show="mode !== 'remove'" >
          <b-col md="3" sm="6">
            <b-form-group label="Preço:" label-for="iten-preco">
              <b-form-input
                id="iten-preco"
                type="number"
                v-model.number="iten.preco"
                :readonly="mode === 'details'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="6">
            <b-form-group label="Lote:" label-for="iten-lote">
              <b-form-input
                id="iten-lote"
                type="text"
                v-model.number="iten.lote"
                :readonly="mode === 'details'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="6">
            <b-form-group label="Fabricante:" label-for="iten-fabricante">
              <b-form-input 
                id="iten-fabricante"
                type="text"
                v-model="iten.fabricante"
                :readonly="mode === 'details'"
                placeholder=""
              />
            </b-form-group>
          </b-col>
         </b-row>
        
        <b-row align-h="center" class="mt-1">
          <b-col md="12" sm="12">
            <b-form-group
              v-if="mode !== 'remove'"
              :readonly="mode === 'details'"
              label-for="iten-descricao"
            >
              <VueEditor v-model="iten.descricao" placeholder="Descrição..." />
            </b-form-group>
          </b-col>
        </b-row>
        <div class="button">
          <b-button
            class="m-1"
            variant="dark"
            v-if="mode === 'save'"
            @click="save"
            >Salvar</b-button
          >
          <b-button
           class="m-1"
           variant="danger" 
           v-if="mode === 'remove'" 
           @click="remove"
            >Excluir</b-button
          >
          <b-button
           class="m-1"
            @click="
              reset();
              cadastro(); "
            >Cancelar</b-button
          >
        </div>
       </b-card>
      </b-form>
    </div>
    <hr />
    <b-table head-row-variant="dark" :items="itens" :fields="fields" 
      :current-page="currentPage"
      :per-page="perPage"
       v-show="adicionar === 'ver'" >
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" title="Alterar" @click="loadUser(data.item); cadastro();" >
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" title="Excluir" @click="loadUser(data.item, 'remove'); cadastro();" class="mx-1">
          <i class="fa fa-trash"></i>
        </b-button>
          <b-button variant="outline-dark" title="Detalhes" @click="loadUser(data.item, 'details'); cadastro();" >
           <b-icon icon="three-dots"></b-icon>
        </b-button>
      </template>    
    </b-table>
    <b-pagination
    v-show="adicionar === 'ver'"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"      
          pills
        ></b-pagination>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { VueEditor } from "vue2-editor";

export default {
  name: "ItensCadastrados",
  components: { VueEditor },
  data: function () {
    return {
      titulo: "Cadastro do Item",  
      adicionar: "ver",
      mode: "save",
      iten: {},
      itens: [],
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'quantidade', label: 'Quantidade', sortable: true },
        { key: 'modelo', label: 'Modelo', sortable: true },
        { key: 'preco', label: 'Preço', sortable: true },
        { key: 'actions', label: 'Ações' },
      ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
    }
  },
  methods: {
    Mode() {
      this.mode = "save";
    },
    cadastro() {
      if (this.adicionar === "ver") {
        this.adicionar = "cad";
      } else if (this.adicionar === "cad") {
        this.adicionar = "ver";
      }
    },
    loadUsers() {
      const url = `${baseApiUrl}/itens`
      axios.get(url).then((res) => {
        this.itens = res.data
        this.totalRows = this.itens.length
      })
    },
    reset() {
      this.mode = "save"
      this.iten = {}
      this.loadUsers()
    },
    save() {
      const method = this.iten.id ? "put" : "post"
      const id = this.iten.id ? `/${this.iten.id}` : ""
      axios[method](`${baseApiUrl}/itens${id}`, this.iten)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.adicionar = "ver";
        })
        .catch(showError);
    },
    remove() {
      const id = this.iten.id;
      axios
        .delete(`${baseApiUrl}/itens/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.adicionar = "ver";
        })
        .catch(showError);
    },
    loadUser(iten, mode = "save") {
      this.mode = mode
      this.iten = { ...iten }
      if(this.mode === "save"){
          this.titulo = "Cadastro do Item"
      }else if (this.mode === "remove"){
          this.titulo = "Exclusão do Item"
      }else{
          this.titulo = "Detalhes do Item"
      }
    },
  },
  mounted() {
    this.loadUsers()
  }
}
</script>

<style>
.button {
  display: flex;
  justify-content:initial;
}
</style>
