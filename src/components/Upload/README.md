# Upload

> 基于 a-upload 组件，进行的二次封装，主要功能是对上传文件进行类型、大小、个数限制，同时能够预览文件，对文件进行删除操作。

## 参数

| 参数 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| file-list | 已经上传的文件列表（受控），配合 v-decorator 使用 | array | [] | 可以使用 v-model 进行双向绑定 |
| accept | 接受上传的文件类型 | string | .pdf,.jpg,.png | - |
| list-type | 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card | string | text | - |
| limit | 最多的上传文件个数 | number | 99 | - |
| limit-size | 最大的上传文件大小 | number | 30 | - |
| upload-text | 上传按钮的文字描述 | string | 上传文件 | - |

## Demo

```html
<!-- 1. 在 a-form 中，配合 v-decorator 使用 -->
<a-form :form="form">
  <a-form-item
    label="附件"
    extra="（可以上传多个附件，附件上传格式为jpg、png、pdf、rar、zip，单个附件大小不能超过30M）"
  >
    <Upload
      v-decorator="[
        'fileList',
        {
          valuePropName: 'fileList',
          rules: [
            {
              required: true,
              message: '请上传附件',
            },
          ],
        },
      ]"
      accept=".jpg,.png,.pdf,.rar,.zip"
    />
  </a-form-item>
</a-form>

<!-- 2. 在 a-form-model 中，配合 v-model 使用 -->
<a-form-model :model="form" :rules="rules">
  <a-form-model-item
    label="附件"
    prop="fileList"
    extra="（可以上传多个附件，附件上传格式为jpg、png、pdf、rar、zip，单个附件大小不能超过30M）"
  >
    <Upload v-model="form.fileList" accept=".jpg,.png,.pdf,.rar,.zip" />
  </a-form-model-item>
</a-form-model>

<!-- 3. 单独使用，v-model -->
<Upload v-model="fileList" accept=".jpg,.png,.pdf,.rar,.zip" />
```
