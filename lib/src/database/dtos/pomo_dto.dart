import 'package:pomodorro/src/models/pomo.dart';
import 'package:pomodorro/src/models/task.dart';

import '../tables.dart';

class PomoDto {
  final _pomos = const PomosTable();
  final _tasks = const TasksTable();

  int? _id;
  DateTime? _startTime;
  DateTime? _endTime;
  Task? _task;

  PomoDto.fromValues({
    int? id,
    required DateTime startTime,
    required DateTime endTime,
    Task? task,
  }) {
    _id = id;
    _startTime = startTime;
    _endTime = endTime;
    _task = task;
  }

  PomoDto.fromMap(Map<String, dynamic> map) {
    _id = map[_pomos.id.name];
    _startTime = DateTime.fromMicrosecondsSinceEpoch(
      map[_pomos.startTime.name],
      isUtc: true,
    );
    _endTime = DateTime.fromMicrosecondsSinceEpoch(
      map[_pomos.endTime.name],
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
      _pomos.startTime.name: _startTime?.microsecondsSinceEpoch,
      _pomos.endTime.name: _endTime?.microsecondsSinceEpoch,
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
      startTime:
          _startTime ?? DateTime.fromMicrosecondsSinceEpoch(0, isUtc: true),
      endTime: _endTime ?? DateTime.fromMicrosecondsSinceEpoch(0, isUtc: true),
      task: _task,
    );
  }
}
