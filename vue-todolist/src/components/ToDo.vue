<template>
    <div class="todo">
        <div>        
            <li><input type="text" v-model="ToDo"></li>
            <li><input type="text" v-model="DeadLine"></li>
            <li><v-btn type="submit" v-on:click="addToDo()">add Task</v-btn></li>
        </div>
        <div>
            <li><v-btn type="submit" v-on:click="allToDo()">all Task</v-btn></li>
            <li>{{ num }}</li>
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
            DeadLine: '',
            DeleteToDo: '',
            num: NaN,
        }
    },

    created: function(){
        this.db = firebase.firestore()
    },

    mounted: function(){
        var _this = this;

        _this.db.collection('todos').get().then(snap => {
            _this.num = snap.size;
        })
    },

    methods: {

        addToDo: function(){
            var _this = this;

            if(_this.ToDo=="" || _this.DeadLine==""){
                return;
            }

            _this.num++;

            // todos コレクションにドキュメントを追加
            _this.db.collection('todos').doc('todo' + String(_this.num)).set({
                todo: _this.ToDo,
                deadline: _this.DeadLine
            }).then(function(){
                // 追加に成功したら、ToDo、DeadLine を空にして、num を1増やす
                _this.ToDo = '',
                _this.DeadLine = ''
            }).catch(function(){
                // エラー時の処理
            })
        },

        allToDo: function(){
            this.db.collection('todos').get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, "=>", doc.data());
                })
            })
        },
    },
    computed: {
    },
}
</script>

<style scoped>
</style>