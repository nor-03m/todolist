<template>
    <div class="todo">
        <div>        
            <li><input type="text" v-model="ToDo"></li>
            <li><v-btn type="submit" v-on:click="addToDo()">add Task</v-btn></li>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore';

export default {
    data(){
        return{
            db: null,
            ToDo: '',
        }
    },
    created: function(){
        this.db = firebase.firestore()
    },
    methods: {
        addToDo: function(){
            var _this = this

            // todos コレクションにドキュメントを追加
            this.db.collection('todos').doc('0OwOfIWnpks82XeANMw9').set({
                ToDo: _this.ToDo,
                
            }, {merge: true})
            .then(function(){
                // 追加に成功したら、name を空にする
                _this.ToDo = ''
            })
            .catch(function(){
                // エラー時の処理
            })
        },   
    },
    computed: {
    },
}
</script>

<style scoped>
</style>