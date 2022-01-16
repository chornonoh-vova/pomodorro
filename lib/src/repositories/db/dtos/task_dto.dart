import 'package:pomodorro/src/models/task.dart';

import '../tables.dart';

class TaskDto {
  final _tasks = const TasksTable();

  int? _id;
  String? _title;
  String _description = '';
  bool _done = false;

  TaskDto.fromValues({
    int? id,
    required String title,
    required String description,
    required bool done,
  }) {
    _id = id;
    _title = title;
    _description = description;
    _done = done;
  }

  TaskDto.fromMap(Map<String, dynamic> map) {
    _id = map[_tasks.id.name];
    _title = map[_tasks.title.name];
    _description = map[_tasks.description.name];
    _done = map[_tasks.done.name] == 1;
  }

  Map<String, dynamic> toMap() {
    var map = {
      _tasks.title.name: _title,
      _tasks.description.name: _description,
      _tasks.done.name: _done ? 1 : 0,
    };

    if (_id != null) {
      map[_tasks.id.name] = _id;
    }

    return map;
  }

  Task toTask() {
    return Task(
      id: _id ?? 0,
      title: _title ?? '',
      description: _description,
      done: _done,
    );
  }
}
