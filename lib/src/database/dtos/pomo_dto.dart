import 'package:pomodorro/src/models/pomo.dart';
import 'package:pomodorro/src/models/task.dart';

import '../tables.dart';

class PomoDto {
  final _pomos = const PomosTable();
  final _tasks = const TasksTable();

  int? _id;
  DateTime? _time;
  Task? _task;

  PomoDto.fromValues({
    int? id,
    required DateTime time,
    Task? task,
  }) {
    _id = id;
    _time = time;
    _task = task;
  }

  PomoDto.fromMap(Map<String, dynamic> map) {
    _id = map[_pomos.id.name];
    _time = DateTime.fromMicrosecondsSinceEpoch(
      map[_pomos.time.name],
      isUtc: true,
    );
    _task = map[_pomos.taskId.name] != null
        ? Task(
            id: map[_pomos.taskId.name],
            title: map[_tasks.title.name],
            description: map[_tasks.description.name],
            done: map[_tasks.done.name] == 1,
          )
        : null;
  }

  Map<String, dynamic> toMap() {
    var map = {
      _pomos.time.name: _time?.microsecondsSinceEpoch,
      _pomos.taskId.name: _task?.id,
    };

    if (_id != null) {
      map[_pomos.id.name] = _id;
    }

    return map;
  }

  Pomo toPomo() {
    return Pomo(
      id: _id ?? 0,
      time: _time ?? DateTime.fromMicrosecondsSinceEpoch(0, isUtc: true),
      task: _task,
    );
  }
}
