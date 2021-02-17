<template>
    <div class="todo">
            <div><input class ="input" type="text" v-model="ToDo" placeholder="task"></div>
            <div><input class="input" type="text" v-model="DeadLine" placeholder="deadline"></div>
            <v-btn class="button" type="submit" v-on:click="addToDo(ToDo); allToDo()">add Task</v-btn>
        <div class="todolist">
            <p></p>
            <!-- <v-checkbox v-for="todo in AllToDo" :key="todo.todo" :label="`${todo.todo}  :  ${todo.deadline}`" color="teal accent-3" @change="checkToDo(todo.todo)"> -->
            <v-checkbox v-for="todo in AllToDo" :key="todo.todo" :label="`${todo.todo}  :  ${todo.deadline}`" color="teal accent-3" @change="checkToDo(todo.todo)">
            </v-checkbox>
        </div>
        <div>
            <v-btn class="button" type="submit" v-on:click="deleteToDo(); allToDo()">delete Task</v-btn>
        </div>
        <div>
            <v-row>
                <v-col>
                    <v-sheet height="94vh">
                        <v-calendar ref="calender" type="month" color="teal accent-1" :events="events" :event-color="getToDoColor" @change="getToDo">
                        </v-calendar>
                    </v-sheet>
                </v-col>
            </v-row>
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
            AllToDo: {},
            //
            tyep: 'month',
            start: null,
            end: null,
            events: []
        }
    },

    created: function(){
        var _this = this
        _this.db = firebase.firestore()

        // このように Vue の ライフサイクルメソッド（下の例では created）に書けば ajax が成功した時に data.json が書き換わります。
        // Vue の data は非同期で変更されても変わった時点で DOM に反映されます。
    },

    mounted: function(){
        var _this = this;

        _this.AllToDo = []
        
        // ページを読み込んだ時点ですべてのタスクを表示する
         _this.db.collection('todos').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                var list = doc.data();
                _this.AllToDo.push({todo: list.todo, deadline: list.deadline, check: false});
            })
        })
    },

    methods: {

        addToDo: function(name){
            var _this = this;

            if(_this.ToDo=="" || _this.DeadLine==""){
                return;
            }

            // todos コレクションにドキュメントを追加
            _this.db.collection('todos').doc(name).set({
                todo: _this.ToDo,
                deadline: _this.DeadLine,
                check: false
            }).then(function(){
                // 追加に成功したら、ToDo、DeadLine を空にする
                _this.ToDo = '',
                _this.DeadLine = ''
            }).catch(function(){
                // エラー時の処理
            })
        },

        allToDo: function(){
            var _this = this

            _this.AllToDo = []

            console.log(_this.AllToDo);

             _this.db.collection('todos').orderBy('deadline').get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    var list = doc.data();

                    _this.AllToDo.push({todo: list.todo, deadline: list.deadline, check: false});
                    console.log(_this.AllToDo);
                })
            })
        },

        deleteToDo: function(){
            var _this = this

            _this.db.collection('todos').where('check', '==', true).get().then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    _this.db.collection('todos').doc(doc.id).delete();
                })
            })
        },

        checkToDo: function(name){
            var _this = this

            _this.db.collection('todos').doc(name).get().then(function(doc){
                let data = doc.data()
                _this.check = data['check']
            })

            _this.db.collection('todos').doc(name).update({
                check: !_this.check
            })
        },

        getToDo: function(){
            var _this = this

            const events = [{
                name: 'Example',
                start: new Date('2021-02-18'),
                end: new Date('2021-02-18'),
                color: 'teal lighten-1',
                }
            ];
            _this.events = events;
        },

        getToDoColor: function(event){
            return event.color;
        },

    },

    computed: {
    },

}
</script>

<style scoped>

.todo{
    text-align: center;
    margin-top: 24px;
}

.todolist{
    text-align: center;
    width: 80%;
    border: double 4px #D3D3D3;
    border-radius: 4px;
    margin: auto;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 8px;
}

.input{
    text-align: center;
    margin: 8px;
    border: solid 1.2px #D3D3D3;
    border-radius:4px;
}

.button{
    margin: 8px;
}

.col{
    text-align: center;
    margin: 24px;
}

</style>