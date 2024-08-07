const suggOption = function (url, results, opt = {}) {
  var data = opt.data ?? {};
  var param = {
    dropdownParent: opt.parent ?? $(document.body),
    language: opt.lang ?? "en",
    dir: opt.dir ?? "ltr",
    allowClear: !!opt.placeholder,
    placeholder: opt.placeholder ?? "",
    debug: true,
    ajax: {
      url: url,
      delay: 350,
      method: "POST",
      dataType: "json",
      minimumInputLength: 2,
      cache: true,
      data: function (params) {
        return $.extend(true, data, {
          q: params.term,
        });
      },
      processResults: function (data) {
        return {
          results: results(data),
        };
      },
    },
  };
  if (!!opt.html)
    param = $.extend(true, param, {
      escapeMarkup: function (markup) {
        return markup;
      },
      templateResult: function (data) {
        return data.html;
      },
      templateSelection: function (data) {
        return data.text;
      },
    });
  return param;
};
