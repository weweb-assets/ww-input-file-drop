---
name: ww-input-file-drop
description: The ww-input-file-drop component enables users to upload files by clicking to open a file explorer or dragging and dropping files, supporting multiple file types and custom extensions, with options for multiple selections, required fields, and read-only settings, while emitting events for file changes and invalid file uploads.
keywords:
  - file upload
  - drag and drop
  - multiple file selection
  - file type support
  - custom file extensions
  - event handling
  - file validation
  - read-only mode
  - required input
  - file explorer integration
---

#### ww-input-file-drop

Component Purpose: File upload component supporting click-to-upload and drag-and-drop functionality with multiple file type support.

Properties:
- multiple: boolean - Enable multiple file selection. Default: false
- required: boolean | bindable - Make input required. Default: true
- readonly: boolean | bindable - Make input read-only. Default: false
- accept: string - Allowed file types (any, image, video, audio, pdf, csv, xls, doc, json, custom). Default: any
- acceptCustom: string - Custom file extensions when accept is custom. Default: ''

Children:
- layout: any[] - Content inside dropzone. Supports ww-text or ww-div with ww-icon and ww-text. Needs margin auto for centering.

Events:
- change: Triggered when files are selected/dropped. Payload: { value: File[] | File }
- initValueChange: Triggered on initial value change. Payload: { value: File[] | File }
- invalidFile: Triggered when invalid files are dropped. Payload: { value: File[] | File }

Variables:
- value: File[] | File - Currently selected file(s)
- progress: number - Upload progress (0-100)
