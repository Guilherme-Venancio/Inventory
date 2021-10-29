<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Usuários" active>
                        <NovoAdmin />
                    </b-tab>
                    <b-tab title="Itens">
                        <ItensCadastrados />
                    </b-tab>   
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../Templates/PageTitle.vue'
import ItensCadastrados from './ItensCadastrados.vue'
import NovoAdmin from './NovoAdmin.vue'


export default {
    name: 'AdminPages',
    components: { PageTitle, ItensCadastrados, NovoAdmin }
}
</script>

<style>

</style>
