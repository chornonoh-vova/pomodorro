import 'task.dart';

class Pomo {
  final int id;
  final DateTime time;
  final Task? task;

  Pomo({
    required this.id,
    required this.time,
    this.task,
  });
}
