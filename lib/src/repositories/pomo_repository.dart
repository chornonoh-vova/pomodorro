import 'package:pomodorro/src/models/pomo.dart';
import 'package:pomodorro/src/models/task.dart';

/// Common interface for Pomo repositories
abstract class PomoRepository {
  /// Create item in underlying data source
  Future<Pomo> create({
    required DateTime time,
    Task? task,
  });

  /// Get one item from underlying data source
  Future<Pomo?> getOne(int id);

  /// Get all items from underlying data source
  Future<List<Pomo>> getAll();

  /// Update item
  ///
  /// Returns updated item
  Future<Pomo?> update(
    int id, {
    DateTime? time,
    Task? task,
  });

  /// Delete item
  ///
  /// Returns number of removed items
  Future<int> delete(int id);

  /// Delete all items
  Future<int> deleteAll();
}
