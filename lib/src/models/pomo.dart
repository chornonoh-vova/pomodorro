import 'package:equatable/equatable.dart';

import 'task.dart';

class Pomo extends Equatable {
  final int id;
  final DateTime startTime;
  final DateTime endTime;
  final Task? task;

  const Pomo({
    required this.id,
    required this.startTime,
    required this.endTime,
    this.task,
  });

  @override
  List<Object?> get props => [id, startTime, endTime, task];
}
