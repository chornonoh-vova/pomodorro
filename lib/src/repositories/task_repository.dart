import 'package:pomodorro/src/models/task.dart';

/// Common interface for Task repositories
abstract class TaskRepository {
  /// Create item in underlying data source
  Future<Task> create({
    required String title,
    required String description,
    required bool done,
  });

  /// Get one item from underlying data source
  Future<Task?> getOne(int id);

  /// Get all items from underlying data source
  Future<List<Task>> getAll();

  /// Perform a search by query
  Future<List<Task>> search(String query);

  /// Update item
  ///
  /// Returns updated item
  Future<Task?> update(
    int id, {
    String? title,
    String? description,
    bool? done,
  });

  /// Delete item
  ///
  /// Returns number of removed items
  Future<int> delete(int id);

  /// Delete all items
  Future<int> deleteAll();
}
