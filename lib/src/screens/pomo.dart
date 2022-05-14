import 'package:flutter/material.dart';

class PomoScreen extends StatefulWidget {
  const PomoScreen({Key? key}) : super(key: key);

  @override
  State<PomoScreen> createState() => _PomoScreenState();
}

class _PomoScreenState extends State<PomoScreen> {
  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(title: const Text('Pomo')),
      body: SafeArea(
        child: Center(
          child: Text(
            'Pomo screen',
            style: textTheme.bodyText1,
          ),
        ),
      ),
    );
  }
}
