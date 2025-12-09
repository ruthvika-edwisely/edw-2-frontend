//
import Card from './Card';
// import Paper from './Paper';
// import Input from './Input';
// import Table from './Table';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Checkbox from './Checkbox';
import Dialog from './Dialog';
import TextField from './TextField';
import Chip from './Chip';
import Switch from './Switch';
import Alert from './Alert';
import TablePagination from './TablePagination';
// import Backdrop from './Backdrop';
// import Typography from './Typography';
// import Autocomplete from './Autocomplete';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Card(theme),
    // Table(theme),
    // Input(theme),
    // Paper(theme),
    Button(theme),
    ButtonGroup(theme),
    Checkbox(theme),
    Dialog(theme),
    TextField(theme),
    Chip(theme),
    Switch(theme),
    Alert(theme),
    TablePagination(theme),
    // Tooltip(theme),
    // Backdrop(theme),
    // Typography(theme),
    // Autocomplete(theme)
  );
}
