class Task {
  final int id;
  final String title;
  final String description;
  final bool done;

  Task({
    required this.id,
    required this.title,
    this.description = '',
    this.done = false,
  });
}
