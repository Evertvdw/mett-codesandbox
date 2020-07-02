import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import TinyMCE from "@tinymce/tinymce-vue";
import "tinymce/tinymce";

Vue.use(CKEditor as any);
Vue.component("editor-tinymce", TinyMCE);

require("@ckeditor/ckeditor5-vue/dist/ckeditor");
