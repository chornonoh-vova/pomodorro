import 'package:equatable/equatable.dart';

class Task extends Equatable {
  final int id;
  final String title;
  final String description;
  final bool done;

  const Task({
    required this.id,
    required this.title,
    this.description = '',
    this.done = false,
  });

  @override
  List<Object?> get props => [id, title, description, done];
}
