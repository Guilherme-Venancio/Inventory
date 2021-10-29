<template>
    <div class="user-admin">
        <b-button pill variant="dark" @click="cadastro()" v-show="adicionar === 'ver'">
            Inculir
        </b-button>
        <b-button pill variant="dark" @click="cadastro()" v-show="adicionar === 'cad'">
            Administrar
        </b-button>
        <b-form v-show="adicionar === 'cad'">
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-input-group size="sm" class="mb-2">
                         <b-input-group-prepend  is-text > 
                     <b-icon  icon="person-fill" ></b-icon > 
                          </b-input-group-prepend >
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Usuário..." />
                            </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-input-group size="sm">
                            <b-input-group-prepend is-text>
                               <b-icon icon="envelope"></b-icon>
                            </b-input-group-prepend>
                          <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do Usuário..." />
                        </b-input-group>
                    </b-form-group>
                    
                </b-col>
            </b-row>
            <b-form-checkbox id="user-admin" v-show="mode === 'save'" 
                v-model="user.admin" class="mt-3 mb-3">
                Administrador?                
            </b-form-checkbox>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-input-group size="sm">
                            <b-input-group-prepend is-text>
                               <b-icon icon="bag"></b-icon>
                            </b-input-group-prepend>
                        <b-form-input id="user-password" type="password"
                            v-model="user.password" required
                            placeholder="Informe a Senha do Usuário..." />
                            </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de Senha:"
                        label-for="user-confirm-password">
                         <b-input-group size="sm">
                            <b-input-group-prepend is-text>
                               <b-icon icon="bag-x"></b-icon>
                            </b-input-group-prepend>
                        <b-form-input id="user-confirm-password" type="password"
                            v-model="user.confirmPassword" required
                            placeholder="Confirme a Senha do Usuário..." />
                            </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col xs="12">
                    <b-button variant="dark" v-if="mode === 'save'" class="m-1"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" class="m-1"
                        @click="remove">Excluir</b-button>
                    <b-button class="m-1" @click="reset(); cadastro()">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table head-row-variant="dark" :items="users" :fields="fields" v-show="adicionar === 'ver'">
            <template slot="cell(actions)" slot-scope="data">
                 <b-button variant="warning" title="Alterar" @click="loadUser(data.item); cadastro();" >
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" title="Excluir" @click="loadUser(data.item, 'remove'); cadastro();" class="mx-1">
          <i class="fa fa-trash"></i>
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
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'NovoAdmin',
    data: function() {
        return {
            adicionar : 'ver',
            mode: 'save',
            user: {},
            users: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'admin', label: 'Administrador', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ],
            totalRows: 1,
        currentPage: 1,
        perPage: 5,
        }
    },
    methods: {
        cadastro() {
         if(this.adicionar === 'ver'){
               this.adicionar = 'cad'
         }else if (this.adicionar === 'cad') {
             this.adicionar  = 'ver'
         }
        },
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
                this.totalRows = this.users.length
            })
        },
        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                    this.adicionar = 'ver'
                })
                .catch(showError)
        },
        remove() {
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                    this.adicionar = 'ver'
                })
                .catch(showError)
        },
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        }
    },
    mounted() {
        this.loadUsers()
    }
}
</script>

<style>

</style>
