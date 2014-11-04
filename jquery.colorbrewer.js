;(function ( $ ) {

    var pluginName = "colorBrewer",
        defaults = {
            colors: colorbrewer,
            modal: true
        };

        // The actual plugin constructor
        function Plugin ( element, options ) {
          this.element = element;
          this.$el = $(element);
          this.settings = $.extend( {}, defaults, options );
          this._defaults = defaults;
          this._name = pluginName;
          this.$picker = $(this.settings.container);
          this.$preview = $(this.settings.preview);
          this.init();
        }

        // Avoid Plugin.prototype conflicts
        $.extend(Plugin.prototype, {

          init: function () {
              this.$el.addClass('colorbrewer');
              this.$picker.addClass('.colorbrewer-picker');
              this.populate();
              this.listen();
          },

          listen: function () {
            this.$el.on('click', $.proxy(this.show, this));
            this.$picker.on('click', 'li', $.proxy(this.selectColor, this));
            this.$picker.on('click', '.accept', $.proxy(this.accept, this));
            this.$picker.on('click', '.cancel', $.proxy(this.cancel, this));
            return this;
          },

          selectColor: function (e) {
            this.$picker.find('li.selected')
              .removeClass('selected');

            var color = $(e.currentTarget)
              .addClass('selected')
              .data('color');

            this.$preview
              .css('background-color', color);
            return this;
          },

          populate: function () {
            var self = this;

            $.each(this.settings.colors, function (name, val) {
              var $brew = $('<ul>')
                  .addClass('brew ' + name)
                  .appendTo(self.settings.modal ? self.$picker.find('.modal-body') : self.$picker);

              var num = val[9] ? 9 : 8;
              $.each(val[num], function (i, hex) {

                 var $color = $('<li>')
                     .addClass('q' + i + '-' + num)
                     .data('color', hex)
                     .css('background-color', hex)
                     .appendTo($brew);
              });

            });

            return this.preview(this.$el.val());
          },

          preview: function (color) {
            this.$preview.css('background-color', color);
            return this;
          },

          hide: function () {
            if (this.settings.modal) {
              this.$picker.modal('hide');
            }
            else {
              this.$picker.hide();
            }
            return this;
          },

          accept: function () {
            this.$el
              .val(this.$picker.find('.selected').data('color'));
            return this.hide();
          },

          show: function () {
            this.oldValue = this.$el.val();
            if (this.settings.modal) {
              this.$picker.modal('show');
            }
            else {
              this.$picker.show();
            }
            return this;
          },

          cancel: function () {
            this.$el.trigger('cancel');
            this.$el.val(this.oldValue);
            return this.hide();
          }

        });

        $.fn[ pluginName ] = function ( options ) {
                this.each(function() {
                        if ( !$.data( this, "plugin_" + pluginName ) ) {
                                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                        }
                });

                return this;
        };

})( jQuery );