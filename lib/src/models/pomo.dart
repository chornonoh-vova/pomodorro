import 'package:equatable/equatable.dart';

import 'task.dart';

class Pomo extends Equatable {
  final int id;
  final DateTime time;
  final Task? task;

  const Pomo({
    required this.id,
    required this.time,
    this.task,
  });

  @override
  List<Object?> get props => [id, time, task];
}
