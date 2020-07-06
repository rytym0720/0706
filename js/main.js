
{
  document.addEventListener('DOMContentLoaded', () => {
    const addTaskTrigger = document.getElementsByClassName('addTask-trigger')[0];
    const addTaskTarget = document.getElementsByClassName('addTask-target')[0];
    const addTaskValue = document.getElementsByClassName('addTask-value')[0];
    const radioWork = document.getElementById('radio-work'); 
    const radioDone = document.getElementById('radio-done');
    let nextId = 0;
    const todos = [];

    //Taskとidを作成
    const addTask = (task, id, tableItem) => {
      const idSpanTd = document.createElement('td');
      const taskSpanTd = document.createElement('td');
      //タスク追加時にtodosにtodoを追加 
      const todo = {
        task: 'taskSpanTd',
        status: '作業中'
      };
      todos.push(todo);
      //要素内のHTML文章を変更する
      idSpanTd.innerText = id;
      taskSpanTd.innerText = task;
      //生成したテーブル要素をブラウザに表示する
      tableItem.append(idSpanTd);
      tableItem.append(taskSpanTd);
      addTaskTarget.append(tableItem);
    };

    //Button要素を生成する
    const addButton = (tableItem, removeButton, createButton) => {
      const createButtonTd = document.createElement('td');
      const removeButtonTd = document.createElement('td');
      //要素内のHTML文章を変更する
      createButton.innerText = '作業中';
      removeButton.innerText = '削除';
      //生成したテーブル要素をブラウザに表示する
      tableItem.append(createButtonTd);
      tableItem.append(removeButtonTd);
      addTaskTarget.append(tableItem);
      //生成したbutton要素を生成する
      createButtonTd.append(createButton);
      removeButtonTd.append(removeButton);
    };

    //追加ボタンをクリックした際にtd要素を追加する処理を行う
    addTaskTrigger.addEventListener('click', () => {
      const task = addTaskValue.value;
      const tableItem = document.createElement('tr');
      const removeButton = document.createElement('button');
      const createButton = document.createElement('button');
      addTask(task, nextId++, tableItem);
      addButton(tableItem, removeButton, createButton);
      addTaskValue.value = '';
      // //削除ボタンを押した時にタスクを削除する
      const deleteElement = (a) => {
        const tableTag = a.target.closest('tr');
        if (tableTag) tableTag.remove();
        updateId();
      }
      removeButton.addEventListener('click', deleteElement, false);

      //ボタンを押したら作業中、完了中と変わる
      createButton.addEventListener('click', (a) => {
        if (createButton.textContent === "作業中") {
          createButton.textContent = "完了";
          const doneParent = a.target.parentNode;
          doneParent.className = 'workDone';/*完了class*/
        } else {
          createButton.textContent = "作業中";
          const workParent = a.target.parentNode;
          workParent.className = 'work';/*作業中class*/
        }
      });
    })

    /*ラジオボタン作業中を押下時の処理*/
    radioDone.addEventListener('click', function () {
      let workTasks = document.getElementsByClassName('work');
      workTasks = Array.from(workTasks);
      if (radioWork.checked === true) {
        workTasks.forEach(function (workTasks) {
          workTasks.style.display = "";
        })
      } else {
        workTasks.forEach(function (workTasks) {
          workTasks.style.display = "none";
        })
      }
    })

    // ラジオボタン完了押下時処理
    radioWork.addEventListener('click', function () {
      let doneTasks = document.getElementsByClassName('workDone');
      doneTasks = Array.from(doneTasks);
      if (radioDone.checked === true) {
        doneTasks.forEach(function (doneTasks) {
          doneTasks.style.display = "";
        })
      } else {
        doneTasks.forEach(function (doneTasks) {
        doneTasks.style.display = "none";
        })
      }
    })

    //　連番　再振り直し
    const updateId = () => {
      const tbody = document.getElementsByTagName("tbody")[0];
      const taskList = tbody.getElementsByTagName('tr');
      nextId = 0;
      Array.from(taskList, tr => {
        tr.getElementsByTagName('td')[0].textContent = nextId;
        nextId++
      });
    }
  });
}