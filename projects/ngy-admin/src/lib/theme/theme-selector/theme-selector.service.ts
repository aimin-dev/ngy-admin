import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';

export const DARK_THEME_STORAGE_KEY = 'app.theme.dark';

// @dynamic
@Injectable({
    providedIn: 'root'
})
export class ThemeSelectorService {

    enabled: boolean = false;
    private renderer: Renderer2;
    public readonly enabled$: BehaviorSubject<boolean>;

    constructor(
        private rendererFactory: RendererFactory2,
        private overlayContainer: OverlayContainer
    ) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
        if (localStorage.getItem(DARK_THEME_STORAGE_KEY)) {
            this.enabled = localStorage.getItem(DARK_THEME_STORAGE_KEY) == 'true';
        } else {
            localStorage.setItem(DARK_THEME_STORAGE_KEY, String(this.enabled));
        }
        this.enabled$ = new BehaviorSubject(this.enabled);
        this.toggleTheme(this.enabled);
    }

    toggleDarkTheme() {
        this.enabled = !this.enabled;
        this.toggleTheme(this.enabled);
        this.enabled$.next(this.enabled);
        localStorage.setItem(DARK_THEME_STORAGE_KEY, String(this.enabled));
    }

    toggleTheme(enabled: boolean) {
        if (enabled) {
            this.renderer.setAttribute(document.body, 'mode', 'dark');
            // this.overlayContainer.getContainerElement().classList.add(DARK_THEME_CLASS_NAME);
        } else {
            this.renderer.setAttribute(document.body, 'mode', 'light');
            // this.overlayContainer.getContainerElement().classList.remove(DARK_THEME_CLASS_NAME);
        }

    }

}
