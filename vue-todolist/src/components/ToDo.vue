<template>
    <div class="todo">
        <div class="todolist">
            <div><input type="text" v-model="ToDo" placeholder="task"></div>
            <div><input type="text" v-model="DeadLine" placeholder="deadline"></div>
            <v-btn type="submit" v-on:click="addToDo(); allToDo()">add Task</v-btn>
        </div>
        <div>
            <v-checkbox v-for="todo in AllToDo" :key="todo.todo" :label="todo.todo" color="cyan lighten-2"></v-checkbox>
            {{ AllToDo }}
        </div>
        <div>
            <v-btn type="submit" v-on:click="deleteToDo(todo.check)">delete Task</v-btn>
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
            check: false,
            num: NaN,
            AllToDo: {}
        }
    },

    created: function(){
        this.db = firebase.firestore()
    },

    mounted: function(){
        var _this = this;

        _this.AllToDo = []

        _this.db.collection('todos').get().then(snap => {
            _this.num = snap.size;
        })
        
        // ページを読み込んだ時点ですべてのタスクを表示する
         _this.db.collection('todos').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                // doc.data() is never undefined for query doc snapshots
                var list = doc.data();
                console.log(doc.id, "=>", doc.data());
                _this.AllToDo.push({todo: list.todo, deadline: list.deadline, check: list.check});
            })
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
                deadline: _this.DeadLine,
                check: _this.check
            }).then(function(){
                // 追加に成功したら、ToDo、DeadLine を空にして、num を1増やす
                _this.ToDo = '',
                _this.DeadLine = ''
            }).catch(function(){
                // エラー時の処理
            })
        },

        allToDo: function(){
            var _this = this

            _this.AllToDo = []

             _this.db.collection('todos').get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    // doc.data() is never undefined for query doc snapshots
                    var list = doc.data();
                    console.log(doc.id, "=>", doc.data());
                    _this.AllToDo.push({todo: list.todo, deadline: list.deadline, check: list.check});
                })
            })
        }

        // deleteToDo: function(){
        //     // _this.db.collection('todos').where('check', '==', true).get().then(res => {
        //     //     res.forEach(doc => {
        //     //         //
        //     //     })
        //     // })
        // }

    },
    computed: {
    },
}
</script>

<style scoped>
</style>