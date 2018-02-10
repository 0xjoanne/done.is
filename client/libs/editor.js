export default function (MediumEditor) {
  // overwrite anchor preview
  const preview = MediumEditor.MediumEditor.extensions.anchorPreview
  MediumEditor.MediumEditor.extensions.anchorPreview = preview.extend({
    getTemplate: function () {
      return `<div class="medium-editor-toolbar-anchor-preview" id="medium-editor-toolbar-anchor-preview">
                <span class="medium-editor-toolbar-anchor-preview-label"></span>
                <i class="iconfont icon-edit medium-editor-toolbar-anchor-preview-edit"></i>
                <a class="medium-editor-toolbar-anchor-preview-open" target="_blank">
                  <i class="iconfont icon-link"></i>
                </a>
              </div>`
    },
    handleClick: function (event) {
      if (event.target.className === 'iconfont icon-edit medium-editor-toolbar-anchor-preview-edit') {
        var anchorExtension = this.base.getExtensionByName('anchor'),
            activeAnchor = this.activeAnchor

        if (anchorExtension && activeAnchor) {
          event.preventDefault()

          this.base.selectElement(this.activeAnchor)

          // Using setTimeout + delay because:
          // We may actually be displaying the anchor form, which should be controlled by delay
          this.base.delay(function () {
            if (activeAnchor) {
              var opts = {
                  value: activeAnchor.attributes.href.value,
                  target: activeAnchor.getAttribute('target'),
                  buttonClass: activeAnchor.getAttribute('class')
              };
              anchorExtension.showForm(opts);
              activeAnchor = null
            }
          }.bind(this))
        }

        this.hidePreview()
      }
    },
    showPreview: function (anchorEl) {
      if (this.anchorPreview.classList.contains('medium-editor-anchor-preview-active') ||
        anchorEl.getAttribute('data-disable-preview')) {
        return true
      }

      const label = this.anchorPreview.querySelector('.medium-editor-toolbar-anchor-preview-label')
      label.textContent = anchorEl.attributes.href.value

      const open = this.anchorPreview.querySelector('.medium-editor-toolbar-anchor-preview-open')
      open.href = anchorEl.attributes.href.value

      this.anchorPreview.classList.add('medium-toolbar-arrow-over')
      this.anchorPreview.classList.remove('medium-toolbar-arrow-under')

      if (!this.anchorPreview.classList.contains('medium-editor-anchor-preview-active')) {
        this.anchorPreview.classList.add('medium-editor-anchor-preview-active')
      }

      this.activeAnchor = anchorEl

      this.positionPreview()
      this.attachPreviewHandlers()

      return this
    }
  })

  // overwrite anchor form
  const anchor = MediumEditor.MediumEditor.extensions.anchor
  MediumEditor.MediumEditor.extensions.anchor = anchor.extend({
    getTemplate: function () {
      var template = [
        '<input type="text" class="medium-editor-toolbar-input" placeholder="', this.placeholderText, '">'
      ]

      template.push(
        '<a href="#" class="medium-editor-toolbar-save"><i class="iconfont icon-save"></i></a>'
      )

      template.push(
        '<a href="#" class="medium-editor-toolbar-close"><i class="iconfont icon-close"></i></a>'
      )

      // both of these options are slightly moot with the ability to
      // override the various form buildup/serialize functions.

      if (this.targetCheckbox) {
          // fixme: ideally, this targetCheckboxText would be a formLabel too,
          // figure out how to deprecate? also consider `fa-` icon default implcations.
          template.push(
              '<div class="medium-editor-toolbar-form-row">',
              '<input type="checkbox" class="medium-editor-toolbar-anchor-target" id="medium-editor-toolbar-anchor-target-field-' + this.getEditorId() + '">',
              '<label for="medium-editor-toolbar-anchor-target-field-' + this.getEditorId() + '">',
              this.targetCheckboxText,
              '</label>',
              '</div>'
          )
      }

      if (this.customClassOption) {
          // fixme: expose this `Button` text as a formLabel property, too
          // and provide similar access to a `fa-` icon default.
          template.push(
              '<div class="medium-editor-toolbar-form-row">',
              '<input type="checkbox" class="medium-editor-toolbar-anchor-button">',
              '<label>',
              this.customClassOptionText,
              '</label>',
              '</div>'
          )
      }

      return template.join('')
    }
  })
}
